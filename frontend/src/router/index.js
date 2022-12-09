import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/cart',
            name: 'cart',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/ShoppingCart.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/LoginPanel.vue')
        },
        {
            path: '/browse',
            name: 'browse',
            component: () =>
                import ('../views/BrowseProducts.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () =>
                import ('../views/Product/EditProduct.vue')
        },
        {
            path: '/products/:id',
            name: 'editProduct',
            component: () =>
                import ('../views/Product/EditProduct.vue')
        },
        {
            path: '/products/new',
            name: 'newProduct',
            component: () =>
                import ('../views/Product/AddProduct.vue')
        },
        {
            path: '/categories',
            name: 'categories',
            component: () =>
                import ('../views/Category/EditCategories.vue')
        },
    ]
})

export default router