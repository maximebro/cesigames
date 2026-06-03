<template>
    <v-layout>
        <v-app-bar class="px-4" app>
            <v-btn class="app-title" variant="text" prepend-icon="mdi-home" color="#E8FF47" to="/">
                <template #prepend>
                    <v-img src="/favicon.png" height="24px" width="24px"/>
                </template>
                Cesi Games
            </v-btn>
            <v-spacer></v-spacer>

            <span class="version-title mr-2">GEOCHAUD <span class="accent">⚡ Édition</span></span>
        </v-app-bar>

        <v-main>
            <RouterView v-slot="{ Component }">
                <v-fade-transition mode="out-in">
                    <component :is="Component" />
                </v-fade-transition>
            </RouterView>
        </v-main>
    </v-layout>
</template>


<script setup lang="ts">
</script>


<style scoped>
.app-title {
    font-size: 20px;
    font-weight: 600;
}

.version-title {
    font-size: clamp(.5rem, 5vw, 1.4rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
}

.version-title .accent {
    color: #E8FF47;
    font-style: italic;
}
</style>
