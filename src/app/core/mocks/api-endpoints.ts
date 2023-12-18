import { environment } from "src/environments/environment";
export class Urls{
    public static URL= environment.apiUrl;
    public static API_ENDPOINT={
        writeUs:'/writeUs',
        developerAndSkills:'/DeveloperAndSkills',
        requirementSearch:'/requirementSearch',
        buildyourteam:'/buildyourteam',
        scheduleMeeting:'/scheduleMeeting',
        // enquiry:'/enquiry',
        hiring:'/hiring',
        save:'/save',
        submitYourIdea:'/submitYourIdea',
        serach:'/search',

    }
}