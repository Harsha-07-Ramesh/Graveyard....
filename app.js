const form = document.getElementById('burialForm');
const graveyard = document.getElementById('graveyard');
const goodbyeMessage = document.getElementById('goodbyeMessage');

let buriedProjects = [];

// Load saved projects from localStorage
window.onload = () => {
  const saved = localStorage.getItem('buriedProjects');
  if (saved) {
    buriedProjects = JSON.parse(saved);
    renderGraves();
  }
};

// Form submit handler
form.addEventListener('submit', e => {
  e.preventDefault();

  const projectName = document.getElementById('projectName').value.trim();
  const reason = document.getElementById('reason').value.trim();
  const dateOfDeath = document.getElementById('dateOfDeath').value;
  const description = document.getElementById('description').value.trim();

  if (!projectName || !reason || !dateOfDeath) {
    alert('Please fill all required fields.');
    return;
  }

  const newProject = {
    id: Date.now(),
    projectName,
    reason,
    dateOfDeath,
    description,
  };

  buriedProjects.push(newProject);
  localStorage.setItem('buriedProjects', JSON.stringify(buriedProjects));
  renderGraves();

  // Show goodbye message and reset form
  goodbyeMessage.classList.remove('hidden');
  form.reset();

  setTimeout(() => {
    goodbyeMessage.classList.add('hidden');
  }, 4000);
});

// Render all tombstones
function renderGraves() {
  graveyard.innerHTML = '';

  if (buriedProjects.length === 0) {
    graveyard.innerHTML = '<p style="color:#cc6666; font-style: italic;">No projects buried yet.</p>';
    return;
  }

  buriedProjects.forEach(project => {
    const tomb = document.createElement('div');
    tomb.classList.add('tombstone');

    tomb.innerHTML = `
      <h3>${escapeHtml(project.projectName)}</h3>
      <p><strong>Reason:</strong> ${escapeHtml(project.reason)}</p>
      <p><strong>Date of Death:</strong> ${escapeHtml(project.dateOfDeath)}</p>
      ${project.description ? `<p><em>${escapeHtml(project.description)}</em></p>` : ''}
    `;

    graveyard.appendChild(tomb);
  });
}

// Basic escape function for safety
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
