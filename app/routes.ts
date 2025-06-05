import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/products.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signUp.tsx'),
  route('favorite-products', 'routes/favoriteProductsList.tsx'),
  route('favorite-products/create', 'routes/favoriteProductsListCreate.tsx'),
  route('favorite-products/edit', 'routes/favoriteProductsListEdit.tsx'),
] satisfies RouteConfig;
