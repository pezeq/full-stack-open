const {
    describe,
    test,
    expect,
    beforeEach
} = require('@playwright/test');
const helper = require('./helper');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        const { username, password, name } = helper.sampleUser1;

        await request.post('/api/testing/reset');
        await request.post('/api/users', {
            data: {
                username,
                password,
                name
            }
        });

        await page.goto('/');
    });

    test('login form is shown', async ({ page }) => {
        const heading = page.getByRole('heading', { name: 'log in to application' });
        const username = page.getByText('username');
        const password = page.getByText('password');
        const button = page.getByRole('button', { name: 'login' });

        await expect(heading).toBeVisible();
        await expect(username).toBeVisible();
        await expect(password).toBeVisible();
        await expect(button).toBeVisible();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            const { username, password, name } = helper.sampleUser1;

            await helper.loginWith(page, username, password);

            const isLoggedIn = page.getByText(`${name} is logged in`);
            const logout = page.getByRole('button', { name: 'logout' });
            const newBlog = page.getByRole('button', { name: 'create new blog' });

            await expect(isLoggedIn).toBeVisible();
            await expect(logout).toBeVisible();
            await expect(newBlog).toBeVisible();
        });

        test('fails with wrong credentials', async ({ page }) => {
            const { username } = helper.sampleUser1;

            await helper.loginWith(page, username, 'wrong');
            const failMessage = page.getByText('Invalid username or password');
            await expect(failMessage).toBeVisible();
        });
    });

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            const { username, password } = helper.sampleUser1;
            const { title, author, url } = helper.sampleBlog1;

            await helper.loginWith(page, username, password);

            await helper.createNewBlog(
                page,
                title,
                author,
                url
            );
        });

        test('a new blog can be created', async ({ page }) => {
            const { title, author }= helper.sampleBlog1;

            await expect(page.getByText(
                title, { exact: true }
            )).toBeVisible();

            await expect(page.getByText(
                author, { exact: true }
            )).toBeVisible();

            await expect(page.getByRole(
                'button', { name: 'view' }
            )).toBeVisible();
        });

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click();

            const likeCounter = await page.getByText('likes:');

            const initialText = await likeCounter.textContent();
            const initialValue = parseInt(initialText.replace('likes: ', ''), 10);

            await page.getByRole('button', { name: 'like' }).click();

            await expect(likeCounter).toHaveText(`likes: ${initialValue + 1}`);
            await expect(page.locator('.alert')).toContainText(`has ${initialValue + 1} likes!`);
        });

        test('user who added the blog can delete the blog', async ({ page }) => {
            const { title } = helper.sampleBlog1;

            await page.getByRole('button', { name: 'view' }).click();

            const blogDiv = await page
                .locator('div')
                .filter({ hasText: `title: ${title}` })
                .nth(3);

            await page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'remove' }).click();

            await expect(blogDiv).not.toBeVisible();
            await expect(page.getByText(`${title} has been deleted!`)).toBeVisible();
        });

        describe('other user is logged in', () => {
            beforeEach(async ({ page, request }) => {
                const { username, password, name } = helper.sampleUser2;

                await page.getByRole('button', { name: 'logout' }).click();

                await request.post('/api/users', {
                    data: {
                        username,
                        password,
                        name
                    }
                });

                await helper.loginWith(page, username, password);
            })

            test('other user can create a blog', async ({ page }) => {
                const { title, author, url } = helper.sampleBlog2;
                await helper.createNewBlog(page, title, author, url);

                await expect(page.getByText(
                    title, { exact: true }
                )).toBeVisible();

                await expect(page.getByText(
                    author, { exact: true }
                )).toBeVisible();

                await expect(page.getByText(
                    `A new blog: ${title} by ${author} was added!`
                )).toBeVisible();
            });

            describe('multiple blogs are posted', () => {
                beforeEach(async ({ page }) => {
                    const { title: title1 } = helper.sampleBlog1;
                    const { title: title2, author: author2, url: url2 } = helper.sampleBlog2;
                    const { title: title3, author: author3, url: url3 } = helper.sampleBlog3;

                    await helper.createNewBlog(page, title2, author2, url2);
                    await helper.createNewBlog(page, title3, author3, url3);

                    const blogRow1 = await page.getByText(title1, { exact: true });
                    const blogRow2 = await page.getByText(title2, { exact: true });
                    const blogRow3 = await page.getByText(title3, { exact: true });

                    await expect(blogRow1).toBeVisible();
                    await expect(blogRow2).toBeVisible();
                    await expect(blogRow3).toBeVisible();

                    await blogRow1
                        .locator('..' )
                        .getByRole('button', { name: 'view' })
                        .click();

                    await blogRow2
                        .locator('..' )
                        .getByRole('button', { name: 'view' })
                        .click();

                    await blogRow3
                        .locator('..' )
                        .getByRole('button', { name: 'view' })
                        .click();
                });

                test('only the user who added the blog sees the blog\'s delete button', async ({ page }) => {
                    const { title: title1 } = helper.sampleBlog1;
                    const { title: title2 } = helper.sampleBlog2;
                    const { title: title3 } = helper.sampleBlog3;

                    const blogDiv1 = page
                        .locator('div')
                        .filter({ hasText: `title: ${title1}` })
                        .nth(3);

                    const blogDiv2 = page
                        .locator('div')
                        .filter({ hasText: `title: ${title2}` })
                        .nth(3);

                    const blogDiv3 = page
                        .locator('div')
                        .filter({ hasText: `title: ${title3}` })
                        .nth(3);

                    await expect(blogDiv1.getByRole(
                        'button', { name: 'remove' }
                    )).not.toBeVisible();

                    await expect(blogDiv2.getByRole(
                        'button', { name: 'remove' }
                    )).toBeVisible();

                    await expect(blogDiv3.getByRole(
                        'button', { name: 'remove' }
                    )).toBeVisible();
                });

                test('the blogs are arranged in the order according to the likes', async ({ page }) => {
                    const likeButton1 = page.getByRole('button', { name: 'like' }).first();
                    const likeButton2 = page.getByRole('button', { name: 'like' }).nth(1);
                    const likeButton3 = page.getByRole('button', { name: 'like' }).last();

                    await likeButton1.click();
                    await likeButton1.click();

                    await likeButton2.click();
                    await likeButton2.click();
                    await likeButton2.click();

                    await likeButton3.click();

                    const blogs = page.locator('.blog');
                    const count = await blogs.count();

                    let likeCounts = [];
                    for (let i = 0; i < count; i++) {
                        const likes = await blogs.getByText('likes:').nth(i);
                        const text = await likes.textContent();
                        const count = parseInt(text.replace('likes: ', ''), 10);

                        likeCounts.push(count);
                    }

                    const sorted = [...likeCounts].sort((a, b) => b - a);
                    expect(likeCounts).toEqual(sorted);
                });
            });
        });
    });
});