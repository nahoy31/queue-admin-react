import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            "app.admin.layout.title": "Task Queue Platform",
            "app.admin.layout.menu.logout": "Logout",
            "app.admin.layout.action.delete": "Delete",
            "app.admin.layout.action.clone": "Clone",

            //################################
            //# consumption
            //################################
            "app.admin.consumption.username": "User",
            "app.admin.consumption.method": "Method",
            "app.admin.consumption.requests": "Requests",
            "app.admin.consumption.help.date": "Click to see details",
            //## titles
            "app.admin.consumption.title.index": "Consumption",
            "app.admin.consumption.subtitle.index": "Consumption",

            //################################
            //# job
            //################################
            "app.admin.job.id": "ID",
            "app.admin.job.command": "Command",
            "app.admin.job.args": "Arguments",
            "app.admin.job.priority": "Prioriry",
            "app.admin.job.queue": "Queue",
            "app.admin.job.worker_name": "Machine",
            "app.admin.job.createdAt": "Created at",
            "app.admin.job.startedAt": "Started at",
            "app.admin.job.checkedAt": "Checked at",
            "app.admin.job.closedAt": "Finished at",
            "app.admin.job.runtime": "Execution time",
            "app.admin.job.exitCode": "Exit code",
            "app.admin.job.status": "Status",

            "app.admin.job.timeline.title.createdAt": "Job created",
            "app.admin.job.description.createdAt": "Job created",
            "app.admin.job.timeline.title.startedAt": "Job started",
            "app.admin.job.description.startedAt": "Job \"command\" started on the machine \"workerName\"",
            "app.admin.job.timeline.title.checkedAt": "Last date of the job running",
            "app.admin.job.description.checkedAt": "Job \"command\" checked and still running",
            "app.admin.job.timeline.title.closedAt": "Job finished",
            "app.admin.job.description.closedAt": "Job finished with the state \"status\" and code \"exitCode\"",
            //## titles
            "app.admin.job.title.index": "Jobs",
            "app.admin.job.title.new": "New job",
            "app.admin.job.title.show": "Job details",
            "app.admin.job.subtitle.index": "List of jobs",
            "app.admin.job.subtitle.new": "",
            "app.admin.job.subtitle.show": "",
            //## flash
            "app.admin.job.flash.created": "The job is created",
            "app.admin.job.flash.cloned": "The job is cloned",
            "app.admin.job.flash.deleted": "The job is deleted",
            //## form
            "app.admin.job.form.title.step_one": "General",
            //## panels
            "app.admin.job.panel.detail": "Details",
            "app.admin.job.panel.timeline": "Timeline",
            "app.admin.job.panel.object": "Json Object"
        }
    },
    fr: {
        translation: {
            "app.admin.layout.title": "Task Queue Platform",
            "app.admin.layout.menu.logout": "Déconnexion",
            "app.admin.layout.action.delete": "Supprimer",
            "app.admin.layout.action.clone": "Cloner",

            //################################
            //# consumption
            //################################
            "app.admin.consumption.username": "Utilisateur",
            "app.admin.consumption.method": "Méthode",
            "app.admin.consumption.requests": "Requêtes",
            "app.admin.consumption.help.date": "Cliquez pour voir le détail",
            //## titles
            "app.admin.consumption.title.index": "Consommation",
            "app.admin.consumption.subtitle.index": "Consommation",

            //################################
            //# job
            //################################
            "app.admin.job.id": "#",
            "app.admin.job.command": "Commande",
            "app.admin.job.args": "Arguments",
            "app.admin.job.priority": "Priorité",
            "app.admin.job.queue": "Queue",
            "app.admin.job.worker_name": "Machine",
            "app.admin.job.createdAt": "Crée le",
            "app.admin.job.startedAt": "Démarée le",
            "app.admin.job.checkedAt": "Vérifié le",
            "app.admin.job.closedAt": "Terminé le",
            "app.admin.job.runtime": "Durée d'exécution",
            "app.admin.job.exitCode": "Code de retour",
            "app.admin.job.status": "Statut",

            "app.admin.job.timeline.title.createdAt": "Création de la tâche",
            "app.admin.job.description.createdAt": "Tâche créée",
            "app.admin.job.timeline.title.startedAt": "Démarrage de la tâche",
            "app.admin.job.description.startedAt": "Tâche \"command\" démarrée sur la machine \"workerName\"",
            "app.admin.job.timeline.title.checkedAt": "Dernière date de la tâche en cours d'exécution",
            "app.admin.job.description.checkedAt": "Tâche \"command\" vérifiée et toujours en cours d'exécution",
            "app.admin.job.timeline.title.closedAt": "Arrêt de la tâche",
            "app.admin.job.description.closedAt": "Tâche terminée avec le statut \"status\" et le code \"exitCode\"",
            //## titles
            "app.admin.job.title.index": "Tâches",
            "app.admin.job.title.new": "Nouvelle tâche",
            "app.admin.job.title.show": "Détail de la tâche",
            "app.admin.job.subtitle.index": "Liste des tâches",
            "app.admin.job.subtitle.new": "''",
            "app.admin.job.subtitle.show": "''",
            //## flash
            "app.admin.job.flash.created": "La tâche a été créée",
            "app.admin.job.flash.cloned": "La tâche a été clonée",
            "app.admin.job.flash.deleted": "La tâche a été supprimée",
            //## form
            "app.admin.job.form.title.step_one": "Informations générales",
            //## panels
            "app.admin.job.panel.detail": "Détails",
            "app.admin.job.panel.timeline": "Chronologie",
            "app.admin.job.panel.object": "Objet Json"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;