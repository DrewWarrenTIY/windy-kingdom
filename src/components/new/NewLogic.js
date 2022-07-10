export const handleNew = (name, next) => {
    if (!name) return window.alert('try a name, dingus')
    const names = JSON.parse(localStorage.getItem('names')) || []
    
    let isNameTaken = false
    for (let i = 0; i < names.length; i++) {
        if (names[i].toLowerCase() === name.toLowerCase()) {
            isNameTaken = true;
        }
    }

    if (isNameTaken) {
        return window.alert('name is taken')
    }

    localStorage.setItem('names', JSON.stringify([...names, name.toLowerCase()]))
    localStorage.setItem('currentPlayer',  name)
    return next()
}