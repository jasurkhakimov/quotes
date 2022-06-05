<template>
    <div class="navbar">
        <router-link v-ripple class="navbar__link" :to="{ name: 'quotes-home' }" active-class="active">
            Главная
        </router-link>
        <router-link v-ripple class="navbar__link" :to="{ name: 'quotes-create' }" active-class="active">
            Добавить цитату
        </router-link>
        <router-link v-ripple class="navbar__link" :to="{ name: 'quotes-categories' }" active-class="active">
            Добавить жанр
        </router-link>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Navbar",
};
</script>

<style lang="scss">
.navbar {
    display: flex;
    border: 1px solid var(--lightgrey) !important;
    padding: 12px;
    border-radius: var(--radius);
    gap: 8px;
    margin-bottom: 24px;
}

a.navbar__link {
    background-color: transparent;
    border-radius: var(--radius-sm);
    padding: 10px 16px;
    color: var(--dark);
    transition: 0.2s all ease;

    &:hover {
        background-color: var(--blue);
        color: var(--light);
    }

    &.active {
        background-color: var(--blue);
        color: var(--light);
    }
}
</style>