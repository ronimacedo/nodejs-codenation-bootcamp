const fs = require('fs')
const path = require('path')

const getFemaleInactiveUsers = (request, response) => {
    const twoMonthsPeriod = 5270400000
    const currentDate = new Date().getTime()
    const directory = path.resolve(__dirname, './users.json')
    const users = fs.readFileSync(directory)
    const parsedUsers = typeof users === 'string' ? JSON.parse(users) : users

    const inactiveUsers = parsedUsers
        .filter(user => {
          const inactivePeriod = currentDate - Date.parse(user.last_active_date)
          const isInactive = inactivePeriod >= twoMonthsPeriod
          const isFemale = user.gender === 'Female'
          return isInactive && isFemale
        })

    response.json(inactiveUsers)
}

module.exports = getFemaleInactiveUsers
