import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cvId = searchParams.get('cvId');
  const selectedTemplate = searchParams.get('selectedTemplate');

  if (!cvId || !selectedTemplate) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // Generate the URL with query parameters
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/cv-download?cvId=${cvId}&selectedTemplate=${selectedTemplate}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Get the exact height of the CV component
  const { width, height } = await page.evaluate(() => {
    const cvElement = document.querySelector('#cv-container');
    if (!cvElement) return { width: 794, height: 1123 }; // Default A4 size in pixels

    const rect = cvElement.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });

  // Generate PDF with exact dimensions
  const pdf = await page.pdf({
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
  });

  await browser.close();

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=CV_${cvId}.pdf`,
    },
  });
}
