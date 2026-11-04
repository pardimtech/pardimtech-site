"""Renderiza scripts/og/og.html em public/assets/og-pardim.png (requer: pip install playwright && playwright install chromium)."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1200, "height": 630})
        await page.goto((ROOT / "scripts/og/og.html").as_uri())
        await page.evaluate("document.fonts.ready")
        await page.screenshot(path=str(ROOT / "public/assets/og-pardim.png"))
        await browser.close()

asyncio.run(main())
