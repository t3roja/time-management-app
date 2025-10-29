

const API_URL = process.env.REACT_APP_API_URL

function updateTokensFromResponse(response) {
    const newAccessToken = response.headers.get('access-token');
    const newClient = response.headers.get('client');
    const newUid = response.headers.get('uid');

    if (newAccessToken && newClient && newUid) {
        localStorage.setItem('access-token', newAccessToken);
        localStorage.setItem('client', newClient);
        localStorage.setItem('uid', newUid);
    }
}

const fetchProjects = async () => {
    try {
        const response = await fetch(API_URL + '/projects',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('access-token'),
                    'client': localStorage.getItem('client'),
                    'uid': localStorage.getItem('uid')
                }
            }
        )

        updateTokensFromResponse(response);

        if (!response.ok) throw new Error("Virhe ladattaessa projekteja");
        return await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

const fetchOneProject = async (id) => {
    try {
        const response = await fetch(API_URL + '/projects/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('access-token'),
                    'client': localStorage.getItem('client'),
                    'uid': localStorage.getItem('uid')
                }
            })

        updateTokensFromResponse(response);

        return await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

const markAsComplete = async (project) => {

    try {

        const response = await fetch(API_URL + '/projects/' + project.id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('access-token'),
                'client': localStorage.getItem('client'),
                'uid': localStorage.getItem('uid')
            },
            body: JSON.stringify({ project: { completed: !project.completed } })
        });
        return  response

    } catch (error) {
        console.error(error)
    }
};

const fetchOneEntry = async (projectid, entryid) => {
    try {
        const response = await fetch(API_URL + '/projects/' + projectid + "/entries/" + entryid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': localStorage.getItem('access-token'),
                    'client': localStorage.getItem('client'),
                    'uid': localStorage.getItem('uid')
                }
            })

        updateTokensFromResponse(response);

        if (!response.ok) throw new Error("Virhe ladattaessa entryä");
        return await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

function isAdmin() {
    return localStorage.getItem('isAdmin');
}

const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL + '/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'access-token': localStorage.getItem('access-token'),
                'client': localStorage.getItem('client'),
                'uid': localStorage.getItem('uid'),
            },
        });

        if (!response.ok) throw new Error('Virhe käyttäjien haussa');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};



export { fetchProjects, fetchOneProject, markAsComplete, fetchOneEntry, isAdmin, fetchUsers }