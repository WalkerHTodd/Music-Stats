// Use a personal access token for personal use
// (Remember: This token expires, so update it when needed)
const personalAccessToken = 'YOUR_PERSONAL_ACCESS_TOKEN';

// Remove the login functionality for personal use
document.getElementById('login-section').style.display = 'none';
document.getElementById('dashboard').style.display = 'block';

// Fetch the user's Spotify profile using the personal access token
async function fetchUserProfile(token) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const data = await response.json();
    console.log("User Profile:", data);
    displayProfile(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Display the user's profile information on the dashboard
function displayProfile(profile) {
  const profileDiv = document.getElementById('profile');
  profileDiv.innerHTML = `
    <img src="${profile.images && profile.images[0] ? profile.images[0].url : ''}" alt="Profile Image" width="100" height="100" />
    <h2>${profile.display_name}</h2>
    <p>Followers: ${profile.followers.total}</p>
  `;
}

// Load the dashboard by fetching the user profile with your personal token
async function loadDashboard() {
  await fetchUserProfile(personalAccessToken);

  // You can also add more fetch calls here (e.g., top artists, top tracks) using the same token.
}

// On window load, load the dashboard
window.addEventListener('load', loadDashboard);
