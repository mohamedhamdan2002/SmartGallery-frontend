/*
 * Public API Surface of shard-lib
 */

// models
export * from './lib/models/auth/authResponse';
export * from './lib/models/auth/loginViewModel';
export * from './lib/models/auth/registerViewModel';
export * from './lib/models/auth/userProfile';
export * from './lib/models/category/categoryForCreateOrUpdate';
export * from './lib/models/category/category';
export * from './lib/models/service/pagination';
export * from './lib/models/service/service';
export * from './lib/models/service/serviceParameters';
export * from './lib/models/service/serviceForCreateOrUpdate';
export * from './lib/models/reservation/reservationDetails';
export * from './lib/models/reservation/address';
export * from './lib/models/reservation/contact';
export * from './lib/models/reservation/reservation';
export * from './lib/models/reservation/reservationForCreation';

// services
export * from './lib/services/api.service';
export * from './lib/services/auth.service';
export * from './lib/services/category.service';
export * from './lib/services/service.service';
export * from './lib/services/reservation.service';

// modules
export * from './lib/material.module';

// components
export * from './lib/components/confirm-dialog/confirm-dialog.component'
