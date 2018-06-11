'use strict';

import { Router } from 'express';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';

const profileRouter = new Router();

profileRouter.get('/profiles', bearerAuthMiddleware, (request, response, next) => {
  return Profile.find()
    .then((profiles) => {
      const allUsers = [];
      profiles.forEach(profile => allUsers.push(profile.username));
      return response.json(allUsers);
    })
    .catch(next);
});

profileRouter.get('/profile', bearerAuthMiddleware, (request, response, next) => {
  return Profile.findOne({ user: request.user._id })
    .then((profile) => {
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.put('/profile/:username', bearerAuthMiddleware, (request, response, next) => {
  console.log('username sent', request.params.username);
  return Profile.findOne({ username: request.params.username })
    .then((profile) => {
      return Profile.findByIdAndUpdate(profile._id);
    })
    .then((updatedProfile) => {
      return response.json(updatedProfile);
    })
    .catch(next);
});

export default profileRouter;
