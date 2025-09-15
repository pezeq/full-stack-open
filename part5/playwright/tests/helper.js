const loginWith = async (page, username, password) => {
    await page.locator('input[name="Username"]').fill(username);
    await page.locator('input[name="Password"]').fill(password);
    await page.getByRole('button', { name: 'login' }).click();
}

const createNewBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click();
    await page.getByLabel('title:').fill(title);
    await page.getByLabel('author:').fill(author);
    await page.getByLabel('url:').fill(url);
    await page.getByRole('button', { name: 'create' }).click();
}

const sampleUser1 = {
    username: 'pezeq',
    password: 'testing123',
    name: 'Pedro Ezequiel'
}

const sampleUser2 = {
    username: 'qezep',
    password: '123testing',
    name: 'Ezequiel Pedro'
}

const sampleBlog1 = {
    title: 'Everything Is Possible',
    author: 'Kevin Garnett',
    url: 'https://bostonceltics.com'
};

const sampleBlog2 = {
    title: 'Man, who is coming in second?',
    author: 'Larry Bird',
    url: 'https://bostonceltics.com'
};

const sampleBlog3 = {
    title: 'The game isn\'t over till the clock says zero',
    author: 'Paul Pierce',
    url: 'https://bostonceltics.com'
};

module.exports = {
    loginWith,
    createNewBlog,
    sampleUser1,
    sampleUser2,
    sampleBlog1,
    sampleBlog2,
    sampleBlog3
};