//export const baseUrl = "https://localhost:44336";
export const baseUrl = "https://platform-utc-server.herokuapp.com";

const application = {
    api: {
        list:"/api/Application",
        get: (id)=> "/api/Application/"+id,
        post:"/api/Application",
        delete: (id)=> "/api/Application/"+id},
    filter:
        {
            byStatus: (status) => `/getListFilteredByStatus?status=${status}`,
            byAuthor: (authorId, status=null) => `/getListFilteredByAuthor?authorId=${authorId}`+(status)?`&status=${status}`:'',
            byAnswerer:(answererId, status=null) => `/getListFilteredByAnswerer?answererId=${answererId}`+(status)?`&status=${status}`:'',
        },
    update:
        {
            addResult: (id) => "/addResult/"+id,
            answerer: "/changeAnswerer",
            status: (id)=>"/changeStatus/"+id,
            textOrSubject: (id)=>"/changeTextOrSubject/"+id
        }
};

const events = {
    api: {
        list: "/api/Event",
        get: (id)=>"/api/Event/"+id,
        post: "/api/Event",
        put: (id)=>"/api/Event/"+id,
        delete: (id)=>"/api/Event/"+id,
    },
    filter:
        {
            byTime:(filter) => `/filter_by_time?filter=${filter}`,
            byOrganization:(organizationId) => `/filter_by_organization?organizationId=${organizationId}`,
        }
};
const news = {
    api:{
        list: '/api/News',
        get: (id)=>`/api/News/`+id,
        post: '/api/News',
        put: (id)=>`/api/News/`+id,
        delete:(id)=>`/api/News/`+id,
    },
    getByOrganization: (id)=>`/news_by_organization?organizationId=${id}`,
};
const organization={
    api:{
        list: '/api/Organization',
        get: (id)=>`/api/Organization/`+id,
        post: '/api/Organization',
        put: (id)=>`/api/Organization/`+id,
        delete:(id)=>`/api/Organization/`+id,
    },
};
const petition = {
    api:{
        list:'/api/Petition',
        get: (id)=>`/api/Petition/`+id,
        post:'/api/Petition'
    },
    filter:{
        byStatus: '/filter_by_status',
        byAuthor:'/filter_by_author'
    }
};
const user={
    login: '/login',
};

export default{
    baseUrl,
    user,
    application,
    petition,
    organization,
    news,
    events,

}