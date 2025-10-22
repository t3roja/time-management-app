

const API_URL = process.env.REACT_APP_API_URL

const fetchProjects = async () => {
    try {
        const response = await fetch(API_URL + '/projects')
        if (!response.ok) throw new Error("Virhe ladattaessa projekteja");
        return await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

const fetchOneProject = async (id) => {
    try {
        const response = await fetch(API_URL + '/projects/' + id)
        if (!response.ok) throw new Error("Virhe ladattaessa projektia");
        return await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

const fetchOneEntry = async (projectid, entryid) => {
    try {
        const response = await fetch(API_URL + '/projects/' + projectid + "/entries/" + entryid)
        if (!response.ok) throw new Error("Virhe ladattaessa entryä");
        return await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

export { fetchProjects, fetchOneProject, fetchOneEntry }