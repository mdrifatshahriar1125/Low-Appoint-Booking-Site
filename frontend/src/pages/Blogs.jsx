import React, { useState, useEffect } from 'react';
import '../styles/Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    document.title = 'Blogs - LegalEase';
    initializeBlogs();
  }, []);

  const initializeBlogs = async () => {
    const defaultBlogs = [
      {
        id: 1,
        title: 'What is useState and how does it work in React?',
        content: `useState is a React Hook that allows functional components to have state. Before hooks, only class components could have state. 

useState returns an array with two elements:
1. The current state value
2. A function to update that value

When you call the state setter function, React schedules a re-render of the component with the new state value. This is the foundation of interactivity in React functional components.

Example: const [count, setCount] = useState(0);

The initial value is passed as an argument to useState. You can have multiple state variables in a single component by calling useState multiple times.`,
        author: 'Legal Tech Team'
      },
      {
        id: 2,
        title: 'What is the purpose of useEffect in React?',
        content: `useEffect is a React Hook that lets you perform side effects in functional components. Side effects are operations that interact with the outside world, such as:

- Fetching data from an API
- Setting up subscriptions
- Manually changing the DOM
- Logging

useEffect runs after the component renders. You can control when it runs using the dependency array:
- No dependency array: runs after every render
- Empty array []: runs only once after initial render
- Array with dependencies: runs when any dependency changes

This hook is essential for managing component lifecycle and external interactions in modern React applications.`,
        author: 'Legal Tech Team'
      },
      {
        id: 3,
        title: 'What is a custom hook in React and when should you use one?',
        content: `A custom hook is a JavaScript function that uses one or more React hooks (like useState, useEffect, etc.). Custom hooks let you extract component logic into reusable functions.

Rules for custom hooks:
1. Must start with 'use' prefix
2. Can call other hooks
3. Should be called unconditionally

Benefits:
- Code reusability: Share stateful logic between components
- Cleaner code: Extract complex logic into hooks
- Better organization: Separate concerns

Use custom hooks when:
- You have logic that multiple components need
- Logic is complex and clutters your component
- You want to create a specific behavior that can be reused

Example: useAuth, useFetch, useLocalStorage - these encapsulate specific functionality that can be used across many components.`,
        author: 'Legal Tech Team'
      },
      {
        id: 4,
        title: 'Difference between controlled and uncontrolled components. Which one is better?',
        content: `Controlled Components:
- React state is the "single source of truth"
- React controls the input value via props
- Every input change updates state via onChange handler
- Value is always controlled by React

Uncontrolled Components:
- DOM is the source of truth
- Similar to traditional HTML forms
- Use useRef to access current value when needed
- Less React integration

When to use Controlled Components (recommended):
- Form validation in real-time
- Conditional form submission
- Displaying dynamic feedback
- Complex form interactions
- Multi-field dependencies

When to use Uncontrolled Components:
- Simple forms with basic submission
- Integration with non-React code
- File uploads
- When you need minimal code

Best Practice: Use controlled components in most cases for better React integration, easier testing, and more control over form behavior. Uncontrolled components are useful for specific edge cases.`,
        author: 'Legal Tech Team'
      },
      {
        id: 5,
        title: 'Tell us something about useFormStatus() in React',
        content: `useFormStatus is a React Hook (currently in experimental stage) that provides information about the form submission status. It's part of React's newer server components and form features.

Key features:
- Returns an object with pending, data, method, and action
- pending: boolean indicating if form is submitting
- Helps disable submit buttons during submission
- Provides feedback during form processing

Usage:
const { pending } = useFormStatus();

Example: You can disable a submit button while waiting for server response:
<button disabled={pending}>
  {pending ? 'Submitting...' : 'Submit'}
</button>

This hook is particularly useful for:
- Preventing duplicate submissions
- Showing loading states
- Disabling inputs during submission
- Improving user experience during async operations

Note: As this is still experimental, check React documentation for current status and browser/framework support.`,
        author: 'Legal Tech Team'
      }
    ];

    setBlogs(defaultBlogs);
  };

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h1>Legal Tech & React Blog</h1>
        <p>Learn about React hooks and best practices for modern web development</p>
      </div>

      <div className="blogs-container">
        {blogs.map(blog => (
          <article key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <div className="blog-meta">
              <span className="author">By {blog.author}</span>
            </div>
            <div className="blog-content">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
