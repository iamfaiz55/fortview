import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/authApi';
import { galleryApi } from './apis/galleryApi';
import { homeGalleryApi } from './apis/homeGalleryApi';
import { offerApi } from './apis/offerApi';
import { selfiePointApi } from './apis/selfiePointApi';
import { activityApi } from './apis/activityApi';
import { adventureActivityApi } from './apis/adventureActivityApi';
import { contactApi } from './apis/contactApi';
import { carouselApi } from './apis/carouselApi';
import { banquetVenueApi } from './apis/banquetVenueApi';
import { eventApi } from './apis/eventApi';
import { gamesApi } from './apis/gamesApi';
import authSlice from './slices/authSlice';
import { spaWellnessApi } from './apis/spaAndWellnessApi';
import { awardApi } from './apis/awardApi';
import { foodApi } from './apis/foodApi';
import { foodStallApi } from './apis/foodStallApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [homeGalleryApi.reducerPath]: homeGalleryApi.reducer,
    [offerApi.reducerPath]: offerApi.reducer,
    [selfiePointApi.reducerPath]: selfiePointApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [adventureActivityApi.reducerPath]: adventureActivityApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [carouselApi.reducerPath]: carouselApi.reducer,
    [banquetVenueApi.reducerPath]: banquetVenueApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [spaWellnessApi.reducerPath]: spaWellnessApi.reducer,
    [awardApi.reducerPath]: awardApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [foodStallApi.reducerPath]: foodStallApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
       galleryApi.middleware,
       homeGalleryApi.middleware,
        offerApi.middleware,
         selfiePointApi.middleware,
          activityApi.middleware,
           adventureActivityApi.middleware,
            contactApi.middleware,
             carouselApi.middleware,
              banquetVenueApi.middleware,
              eventApi.middleware,
              gamesApi.middleware,
              spaWellnessApi.middleware,
              awardApi.middleware,
              foodApi.middleware,
              foodStallApi.middleware
              ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
