import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            "app.admin.layout.title": "Task Queue Platform",
            "app.admin.layout.menu.logout": "Logout",
            "app.admin.layout.action.add": "Add",
            "app.admin.layout.action.cancel": "Cancel",
            "app.admin.layout.action.clone": "Clone",
            "app.admin.layout.action.create": "Create",
            "app.admin.layout.action.delete": "Delete",
            "app.admin.layout.action.hide": "Hide",
            "app.admin.layout.action.reduce": "Reduce",
            "app.admin.layout.action.refresh": "Refresh",
            "app.admin.layout.action.return": "Return",
            "app.admin.layout.action.save": "Save",
            "app.admin.layout.text.element": "element",
            "app.admin.layout.text.all": "All",
            "app.admin.layout.text.pending": "Pending",
            "app.admin.layout.text.running": "Running",
            "app.admin.layout.text.failed": "Failed",
            "app.admin.layout.text.finished": "Success",
            "app.admin.layout.text.total": "Total",
            // nav
            "app.admin.layout.nav.jobs": "Jobs",
            "app.admin.layout.nav.logout": "Logout",
            "app.admin.layout.nav.settings": "Settings",
            "app.admin.layout.nav.settings.consumption": "Usage API",
            "app.admin.layout.nav.settings.plan": "Plan",

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
            "app.admin.job.arg": "Argument",
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
            "app.admin.job.panel.object": "Json Object",

            //################################
            //# settings
            //################################
            //## titles
            "app.admin.settings.title.edit": "My settings",
            "app.admin.settings.text.informations": "General informations",
            "app.admin.settings.text.organization": "Orgnanization",
            "app.admin.settings.text.address": "Address",
            "app.admin.settings.email": "E-mail",
            "app.admin.settings.firstName": "Firstname",
            "app.admin.settings.lastName": "Lastname",
            "app.admin.settings.company": "Company",
            "app.admin.settings.website": "Website",
            "app.admin.settings.address1": "Address 1",
            "app.admin.settings.address2": "Address 2",
            "app.admin.settings.city": "City",
            "app.admin.settings.zipCode": "Zip code",
            "app.admin.settings.state": "State",
            "app.admin.settings.country": "Country"
        }
    },
    fr: {
        translation: {
            "app.admin.layout.title": "Task Queue Platform",
            "app.admin.layout.menu.logout": "Déconnexion",
            "app.admin.layout.action.add": "Ajouter",
            "app.admin.layout.action.cancel": "Annuler",
            "app.admin.layout.action.clone": "Cloner",
            "app.admin.layout.action.create": "Créer",
            "app.admin.layout.action.delete": "Supprimer",
            "app.admin.layout.action.hide": "Cacher",
            "app.admin.layout.action.reduce": "Réduire",
            "app.admin.layout.action.refresh": "Rafraîchir",
            "app.admin.layout.action.return": "Retour",
            "app.admin.layout.action.save": "Enregistrer",
            "app.admin.layout.text.element": "élément",
            "app.admin.layout.text.all": "Tous",
            "app.admin.layout.text.pending": "En attente",
            "app.admin.layout.text.running": "En cours",
            "app.admin.layout.text.failed": "Échoué",
            "app.admin.layout.text.finished": "Succès",
            "app.admin.layout.text.total": "Total",
            // nav
            "app.admin.layout.nav.jobs": "Tâches",
            "app.admin.layout.nav.logout": "Déconnexion",
            "app.admin.layout.nav.settings": "Réglages",
            "app.admin.layout.nav.settings.consumption": "Consommation API",
            "app.admin.layout.nav.settings.plan": "Formule",

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
            "app.admin.job.arg": "Argument",
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
            "app.admin.job.panel.object": "Objet Json",

            //################################
            //# settings
            //################################
            //## titles
            "app.admin.settings.title.edit": "Réglages",
            "app.admin.settings.text.informations": "Informations personnelles",
            "app.admin.settings.text.organization": "Orgnanisation",
            "app.admin.settings.text.address": "Adresse",
            "app.admin.settings.email": "Adresse e-mail",
            "app.admin.settings.firstName": "Prénom",
            "app.admin.settings.lastName": "Nom",
            "app.admin.settings.company": "Société",
            "app.admin.settings.website": "Site internet",
            "app.admin.settings.address1": "Adresse ligne 1",
            "app.admin.settings.address2": "Adresse ligne 2",
            "app.admin.settings.city": "Ville",
            "app.admin.settings.zipCode": "Code postal",
            "app.admin.settings.state": "Région",
            "app.admin.settings.country": "Pays"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "fr",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;