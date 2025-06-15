import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env before using env variables

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import AppleStrategy from "passport-apple";
import User from "./models/auth.model.js";

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google strategy
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id, provider: "google" });
        if (!user) {
          user = await User.create({
            provider: "google",
            providerId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            password: "",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

// Facebook OAuth Strategy
passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/v1/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id, provider: "facebook" });
        if (!user) {
          user = await User.create({
            provider: "facebook",
            providerId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            photo: profile.photos?.[0]?.value || "",
            password: "",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Apple OAuth Strategy (needs setup with Apple Developer account)
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: "/api/v1/auth/apple/callback",
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      passReqToCallback: false,
      scope: ["name", "email"],
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        const appleId = idToken.sub;
        let user = await User.findOne({ providerId: appleId, provider: "apple" });
        if (!user) {
          user = await User.create({
            provider: "apple",
            providerId: appleId,
            name: profile?.name?.firstName || "Apple User",
            email: profile?.email || "",
            password: "",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
