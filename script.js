/*
    Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
        Use at least one array.
        Use at least two classes.
        Your menu should have the options to create, view, and delete elements.
*/
class Dev {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return ` ${this.name} - ${this.position} dev`;
    }
}
class Team {
    constructor(name) {
        this.name = name;
        this.devs = [];
    }
    addTeamDev(dev) {
        if (dev instanceof Dev) {
            this.devs.push(dev);
        } else {
            throw new Error(`You can only add an instance of dev. ${dev} is not a dev`);
        }
    }
    describe() {
        return `Team ${this.name} has ${this.devs.length} devs`;
    }
}
class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }
    start() {
        let selection0 = this.showMainMenuOptions();
        while (selection0 != 0) {
            switch (selection0) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayAllTeams();
                    break;
                default:
                    selection0 = 0;
            }
            selection0 = this.showMainMenuOptions();
        }
        alert('Bye bye!');
    }
    showMainMenuOptions() {
        return prompt(`
            Project Promineo: Development Teams Master List
        
            0) Exit
            1) Create a new dev team
            2) View an existing team
            3) Delete a team
            4) Display all dev teams
        `)
    }
    showTeamMenuOptions(teamInfo) {
        return prompt(`
        ${teamInfo}
        _________________________

        0) << Back
        1) + Add a new dev member
        2) - Delete a dev member
        
        `);
    }
    displayAllTeams() {
        let teamsString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamsString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamsString);
    }
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }
    viewTeam() {
        let index = prompt("Enter the index of the team that you want to view:");
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';
            description += ' ' + this.selectedTeam.describe() + '\n ';
            for (let i = 0; i < this.selectedTeam.devs.length; i++) {
                description += i + ') ' + this.selectedTeam.devs[i].describe() + '\n';
            }
            let selection1 = this.showTeamMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createDev();
                    break;
                case '2':
                    this.deleteDev();
            }
        }
    }
    deleteTeam() {
        let index = prompt('Enter index of the team you want to delete: /n (Please note this cannot be undone)')
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }
    createDev() {
        let name = prompt(`Enter dev name: `);
        let position = prompt(`Enter dev position: `);

        this.selectedTeam.addTeamDev(new Dev(name, position));

    }
    deleteDev() {
        let index = prompt('Enter index of the dev you want to delete: ')
        if (index > -1 && index < this.selectedTeam.devs.length) {
            this.selectedTeam.devs.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();