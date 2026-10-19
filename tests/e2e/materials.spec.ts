import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('shows empty state when there are no materials', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Материалы' })).toBeVisible();
  await expect(page.getByText('Материалов пока нет')).toBeVisible();
  await expect(page).toHaveTitle('Материалы | Моя планета');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
});

test('shows validation errors for empty form', async ({ page }) => {
  await page.goto('/materials/create');
  await page.getByRole('button', { name: 'Сохранить' }).click();

  await expect(page.getByText('Введите заголовок')).toBeVisible();
  await expect(page.getByText('Введите краткое описание')).toBeVisible();
  await expect(page.getByText('Введите текст материала')).toBeVisible();
  await expect(page).toHaveURL(/\/materials\/create$/);
});

test('limits title length', async ({ page }) => {
  await page.goto('/materials/create');
  const title = page.getByPlaceholder('Введите заголовок');
  await title.fill('a'.repeat(100));

  await expect(title).toHaveValue('a'.repeat(80));
});

test('creates material and opens its page', async ({ page }) => {
  await page.goto('/materials/create');
  await page.getByPlaceholder('Введите заголовок').fill('Совы и их голова');
  await page.getByPlaceholder('Введите краткое описание...').fill('Короткое описание');
  await page.locator('.ProseMirror').click();
  await page.keyboard.type('Основной текст материала');
  await page.getByRole('button', { name: 'Сохранить' }).click();

  await expect(page).toHaveURL(/\/materials\/\d+$/);
  await expect(page.getByRole('heading', { name: 'Совы и их голова' })).toBeVisible();
  await expect(page.getByText('Короткое описание')).toBeVisible();
  await expect(page.getByText('Основной текст материала')).toBeVisible();
});

test('lists created material and links to its page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Совы и их голова/ }).click();

  await expect(page).toHaveURL(/\/materials\/\d+$/);
  await expect(page.getByRole('heading', { name: 'Совы и их голова' })).toBeVisible();
});

test('shows 404 for unknown material', async ({ page }) => {
  const response = await page.goto('/materials/999999');

  expect(response?.status()).toBe(404);
});
