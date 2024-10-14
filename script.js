document.addEventListener('DOMContentLoaded', function () {
    const serverStatusDiv = document.getElementById('server-status');
    const playerListDiv = document.getElementById('player-list');

    // Ubah IP dan port server sesuai kebutuhan
    const serverIP = "IP_SERVER";  // Contoh: "51.254.45.103"
    const serverPort = "PORT_SERVER";  // Contoh: "7777"

    const apiUrl = `https://api.game-state.com/${serverIP}:${serverPort}/?players&info`;

    function fetchServerStatus() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    displayServerStatus(data);
                } else {
                    serverStatusDiv.innerHTML = "<p>Server Offline</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching server data:", error);
                serverStatusDiv.innerHTML = "<p>Failed to load server status</p>";
            });
    }

    function displayServerStatus(data) {
        const serverInfo = data.info;
        const players = data.players;

        // Menampilkan status server
        serverStatusDiv.innerHTML = `
            <div class="server-info">
                <p><strong>Server Name:</strong> ${serverInfo.hostname}</p>
                <p><strong>Status:</strong> Online</p>
                <p><strong>Players:</strong> ${serverInfo.numplayers} / ${serverInfo.maxplayers}</p>
            </div>
        `;

        // Menampilkan daftar pemain
        if (players.length > 0) {
            let playerListHTML = '<ul>';
            players.forEach(player => {
                playerListHTML += `<li>${player.name} (Score: ${player.score})</li>`;
            });
            playerListHTML += '</ul>';

            playerListDiv.innerHTML = `
                <h2>Players Online:</h2>
                ${playerListHTML}
            `;
        } else {
            playerListDiv.innerHTML = "<p>No players online</p>";
        }
    }

    // Panggil fungsi setiap 30 detik untuk memperbarui status
    fetchServerStatus();
    setInterval(fetchServerStatus, 30000);
});
