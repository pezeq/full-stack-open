import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'https://testing-react.com/',
    likes: 13,
    user: { username: 'testUser', name: 'Test User' }
};

const user = { username: 'testUser', name: 'Test User' };

test('only renders title and author by default', () => {
    render(<Blog blog={blog} />);

    const title = screen.getByText('Testing React');
    const author = screen.getByText('Pedro Ezequiel');
    const url = screen.queryByText('https://testing-react.com/');
    const likes = screen.queryByText(0);

    screen.debug(title);
    screen.debug(author);

    expect(title).toBeDefined();
    expect(author).toBeDefined();

    expect(url).toBeNull();
    expect(likes).toBeNull();
});

test('url and likes are shown when button is clicked', async () => {
    render(<Blog blog={blog} user={user}/>);

    const button = screen.getByText('view');
    await userEvent.click(button);

    screen.debug(button);

    const url = screen.getByText('https://testing-react.com/');
    const likes = screen.getByText(13);

    screen.debug(url);
    screen.debug(likes);

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
});

test('like button is clicked twice, the event handler is called twice', async () => {
    const mockHandler = vi.fn();

    render(<Blog
        blog={blog}
        user={user}
        handleLikeIncrease={mockHandler}
    />);

    const buttonView = screen.getByText('view');
    await userEvent.click(buttonView);

    const buttonLike = screen.getByText('like');
    await userEvent.click(buttonLike);
    await userEvent.click(buttonLike);

    expect(mockHandler).toBeCalled(2);
});