document.addEventListener('DOMContentLoaded', function() {
    async function fetchSnippets() {
        try {
            const response = await fetch('https://api.github.com/repos/IsIvrag/CodeKeep/issues');
            const issues = await response.json();

            const snippetsContainer = document.querySelector('#snippets');
            snippetsContainer.innerHTML = ''; // Clear existing snippets

            issues.forEach(issue => {
                if (issue.state === 'open' && issue.labels.some(label => label.name === 'documentation')) {
                    const snippetElement = document.createElement('div');
                    snippetElement.className = 'p-4 bg-white border border-gray-200 rounded-lg shadow-sm';

                    // Create snippet content
                    snippetElement.innerHTML = `
                        <div class="flex items-center gap-4 mb-4">
                            <img src="${issue.user.avatar_url}" alt="${issue.user.login}'s profile picture" class="w-12 h-12 rounded-full">
                            <div>
                                <p class="font-semibold">${issue.user.login}</p>
                                <p class="text-sm text-gray-500">Contributor</p>
                            </div>
                        </div>
                        <h3 class="text-lg font-semibold">${issue.title}</h3>
                        <pre class="bg-gray-100 p-4 rounded-md overflow-x-auto"><code>${issue.body}</code></pre>
                    `;

                    snippetsContainer.appendChild(snippetElement);
                }
            });
        } catch (error) {
            console.error('Error fetching snippets:', error);
        }
    }

    fetchSnippets();
});
