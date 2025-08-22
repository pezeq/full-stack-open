const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
}) => (
    <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                value={username}
                type='text'
                onChange={({ target }) => setUsername(target.value)}
                name='Username'
            />
            </div>
            <div>
                password
                <input
                value={password}
                type='password'
                onChange={({ target }) => setPassword(target.value)}
                name='Password'
            />
            </div>
            <button type='submit'>login</button>
        </form>
    </div>
)

export default LoginForm;