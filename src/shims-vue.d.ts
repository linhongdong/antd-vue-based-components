declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}
declare module 'vue/types/vue' {
    // interface Vue {
    // install: Function;
    // }
    interface VueConstructor {
        install: any;
    }
}
