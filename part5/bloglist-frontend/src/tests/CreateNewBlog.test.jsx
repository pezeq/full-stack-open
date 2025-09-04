import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNewBlog from '../components/CreateNewBlog.jsx';

test('new blog calls the event handler with the right details', async () => {
    const mockHandler = vi.fn();

    render(<CreateNewBlog handleBlogCreation={mockHandler} />);

    const titleInput = screen.getByLabelText('title:');
    const authorInput = screen.getByLabelText('author:');
    const urlInput = screen.getByLabelText('url:');
    const createButton = screen.getByText('create');

    await userEvent.type(titleInput, 'Testing');
    await userEvent.type(authorInput, 'Tester');
    await userEvent.type(urlInput, 'https://testing-react.com/');

    await userEvent.click(createButton);

    console.log(mockHandler.mock.calls);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({
        title: 'Testing',
        author: 'Tester',
        url: 'https://testing-react.com/'
    });
});