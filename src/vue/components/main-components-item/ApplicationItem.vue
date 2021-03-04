<template>
    <div class="min-vh-100">
        <h4 class="text-center mt-2">Інформація про заявку {{ $route.params.id }}</h4>
        <div>
            <b-row>
                <b-col sm="3">Статус:</b-col>
                <b-col sm="9"><b-icon :icon="getIconStatus(application.status)"/> {{getStatusLine(application.status)}}</b-col>
            </b-row>
            <b-row>
                <b-col sm="3">Автор:</b-col>
                <b-col sm="9"><router-link :to="`/users/${application.authorId}`">{{application.authorName}}</router-link></b-col>
            </b-row>
            <b-row>
                <b-col sm="3">Час створення:</b-col>
                <b-col sm="9">{{application.openDate}}</b-col>
            </b-row>
            <b-row>
                <b-col sm="3">Тема:</b-col>
                <b-col sm="9">{{application.subject}}</b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="12" v-html="editHtmText(application.text)"/>
            </b-row>
            <!--TODO: MULTIMEDIA-->
        </div>
        <div class="mt-4" v-if="application.status==3">
            <b-row>
                <b-col sm="3">Автор відповіді:</b-col>
                <b-col sm="9">{{application.answererName}}</b-col>
            </b-row>
            <b-row class="smallerText">
                <b-col sm="3">Дата відповіді:</b-col>
                <b-col sm="9">{{application.closeDate}}</b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="12" v-html="editHtmText(application.result)"/>
            </b-row>

        </div>

    </div>
</template>

<script>
    export default {
        name: "ApplicationItem",
        methods:{
            editHtmText(text){
                let addLines = this.newLinedText(text);
                let removeHtml = this.remove_tags(addLines);
                return removeHtml;
            },
            remove_tags(html){
                let br = html.replaceAll("<br>","||br||").replaceAll("<br/>","||br||").replaceAll("<br />","||br||");
                let i = br.replaceAll("<i>","||is||").replaceAll("</i>","||ie||");
                let b = i.replaceAll("<b>","||bs||").replaceAll("</b>","||be||");

                let tmp = document.createElement("DIV");
                tmp.innerHTML = b;
                let result = tmp.textContent||tmp.innerText;
                result = result.replaceAll("||br||","<br />")
                    .replaceAll("||is||","<i>").replaceAll("||ie||","</i>")
                    .replaceAll("||bs||","<b>").replaceAll("||be||","</b>");
                return result;
            },
            newLinedText: (t)=> t.replaceAll('\n','<br />'),
            getStatusLine(st){
                var s = parseInt(st);
                switch (s) {
                    case 1: return 'Очікується';
                    case 2: return "В процесі";
                    case 3: return "Закрита";
                }
            },
            getIconStatus(st){
                var s = parseInt(st);
                switch (s) {
                    case 1: return 'clock';
                    case 2: return "hourglass-split";
                    case 3: return "check2-circle";
                }
            }

        },
        data(){
            return{
                application: {id: 3, authorId: 1, answerId: 2,authorName: "First Second Lastlast",
                    subject: 'Тема заявки 1 Ла-ла-ла-ла-ла-ла- але не має бути занадто довгою',
                    text: "Текст що описує дуууууууууууууууууууууже велииику пробему "+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."+
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n" +
                        "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n" +
                        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n" +
                        "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n" +
                        "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n" +
                        "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    status: 3,//close
                    result: 'Result a lot oadldldl go away',answererName: "First Second Lastlast",
                    openDate: "27.02.2021, 18:04:47",
                    closeDate: "27.02.2021, 18:04:47"}
            }
        }

    }
</script>

<style scoped>

</style>