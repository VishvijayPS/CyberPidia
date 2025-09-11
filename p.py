import os

# Define project root
project_root = 'Cyberpidia/frontend/cyberpidia-frontend'

# Folder structure
folders = [
    'public',
    'src',
    'src/context',
    'src/components',
    'src/pages',
    'src/theme'
]

# Files with sample starter content
files_with_content = {
    'public/index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Cyberpidia</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
''',

    'src/index.js': '''import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
''',

    'src/App.js': '''import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Books from './pages/Books';
import Courses from './pages/Courses';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import PasswordReset from './pages/PasswordReset';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/books" element={<Books />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/password-reset" element={<PasswordReset />} />
            </Routes>
        </Router>
    );
}

export default App;
''',

    'src/context/AuthContext.js': '''import { createContext } from 'react';

const AuthContext = createContext();

export default AuthContext;
''',

    'src/theme/lightDarkTheme.js': '''import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
''',

    'src/components/Navbar.js': '''import React from 'react';

function Navbar() {
    return <nav>Cyberpidia Navbar</nav>;
}

export default Navbar;
''',

    'src/components/ThemeToggle.js': '''import React from 'react';

function ThemeToggle() {
    return <button>Toggle Theme</button>;
}

export default ThemeToggle;
''',

    'src/components/SearchBar.js': '''import React, { useState } from 'react';

function SearchBar({ setResults }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        // implement search logic
    };

    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
''',

    'src/pages/Home.js': '''import React from 'react';

function Home() {
    return <div>Welcome to Cyberpidia</div>;
}

export default Home;
''',

    'src/pages/Tools.js': '''import React from 'react';

function Tools() {
    return <div>Tools Page</div>;
}

export default Tools;
''',

    'src/pages/Books.js': '''import React from 'react';

function Books() {
    return <div>Books Page</div>;
}

export default Books;
''',

    'src/pages/Courses.js': '''import React from 'react';

function Courses() {
    return <div>Courses Page</div>;
}

export default Courses;
''',

    'src/pages/Login.js': '''import React from 'react';

function Login() {
    return <div>Login Page</div>;
}

export default Login;
''',

    'src/pages/AdminPanel.js': '''import React from 'react';

function AdminPanel() {
    return <div>Admin Panel</div>;
}

export default AdminPanel;
''',

    'src/pages/PasswordReset.js': '''import React from 'react';

function PasswordReset() {
    return <div>Password Reset Page</div>;
}

export default PasswordReset;
'''
}

# Create folders
for folder in folders:
    os.makedirs(os.path.join(project_root, folder), exist_ok=True)

# Create files with starter code
for file_path, content in files_with_content.items():
    full_path = os.path.join(project_root, file_path)
    with open(full_path, 'w') as f:
        f.write(content)

print(f"Frontend folder structure with starter code created successfully!")
