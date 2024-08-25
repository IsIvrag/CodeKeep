// scripts/main.js
document.addEventListener('DOMContentLoaded', function() {
    async function fetchSnippets() {
        const response = await fetch('https://api.github.com/repos/IsIvrag/codekeep/issues');
        const issues = await response.json();

        const snippetsContainer = document.querySelector('#snippets');
        issues.forEach(issue => {
            if (issue.state === 'open') {
                const snippetElement = document.createElement('div');
                snippetElement.className = 'p-4 bg-white border border-gray-200 rounded-lg shadow-sm';
                snippetElement.innerHTML = `
                    <h3 class="text-lg font-semibold">${issue.title}</h3>
                    <pre class="bg-gray-100 p-2 rounded">${issue.body}</pre>
                `;
                snippetsContainer.appendChild(snippetElement);
            }
        });
    }

    fetchSnippets();
});
