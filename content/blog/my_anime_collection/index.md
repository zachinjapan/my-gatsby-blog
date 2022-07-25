---
title: My Anime Collection Walkthrough
date: "2022-07-24"
description: "An in-depth walkthrough of the code base for My Anime Collection."
tags: ["web development", "backend-development", "frontend-development"]
---

If you would rather have a video walkthrough of the codebase, you can watch

it here: [https://youtu.be/YVlIq4clxxk](https://youtu.be/YVlIq4clxxk)

## **Client**

### Public

Standard React App setup. The index.html file has a bunch of meta info for different social media, and a thumbnail image is used for the meta info.

```

   <meta name="Twitter:card" content="summary_large_image" />
    <meta name="Twitter:title" content="My Anime Collection" />
    <meta
      name="Twitter:description"
      content="An anime tracker application made by Zach Stone."
    />
    <meta name="twitter:image" content="%PUBLIC_URL%/thumb1.png" />


```

### src

This is where the front-end app is located and is divided into parts.

### assets

a folder containing all of the global CSS and images for the app

##### CSS

The CSS files are split into separate files and then imported into the index.css file.

```
@import "dark.css";
@import "light.css";
@import "text.css";
@import "forms.css";
@import "buttons.css";
```

The entire app uses light and dark themes, which can be changed on the profile page. The preference is saved in the user schema, so if the user logs onto a new device, it will still be their preferred color theme.

example

```
[data-theme="dark"] {
  /* colors */
  --yellow-light: #cdbf42;
```

#### images

This folder contains all of the images in the app. They are all in webp format to reduce file size, and some are organized into separate folders, such as the sample anime cards and testimonial headshots on the landing page.

#### audio

This contains the audio for the app. the audio is saved in the global state so it can be started and stopped from the landing or on any page once the user has logged in. I plan to create something more akin to a playlist-like experience in a future update.

#### Components

The components are organized according to atomic design principles. I also used styled-components to keep the CSS clean and out of the global CSS files when only used in single components.

Here are a few examples

##### Atoms

Logo Components

```
import logo from "../../assets/images/logo.svg";

const Logo = () => {
  return <img src={logo} alt="My Anime Collection" className="logo" />;
};

export default Logo;
```

#### Molecules

Music and language changer component

```
import america from "../../assets/images/america.webp";
import IconButton from "@mui/material/IconButton";
import japan from "../../assets/images/japan.webp";
import Box from "@mui/material/Box";
import { useAppContext } from "../../context/appContext";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//icons
import { PlayCircle, PauseCircle } from "@mui/icons-material";

const MusicAndFlag = () => {
  const { changeSiteLanguage, playOrPauseAudio, isAudioPlaying } =
    useAppContext();
  const { i18n } = useTranslation();

  return (
    <Wrapper>
      {i18n.language === "en" ? (
        <Box className="full-flag-div flag-div-holder">
          <IconButton
            color="warning"
            size="medium"
            variant="contained"
            aria-label="play/ pause"
            onClick={(e) => playOrPauseAudio(e)}
          >
            {isAudioPlaying ? (
              <PauseCircle fontSize="large" />
            ) : (
              <PlayCircle fontSize="large" />
            )}
          </IconButton>
          <div className="flag-div nav-button">
            <img
              className="flag"
              src={japan}
              alt="Japan Flag"
              onClick={() => changeSiteLanguage("jp")}
            />
          </div>
        </Box>
      ) : (
        <Box className="full-flag-div flag-div-holder">
          <IconButton
            color="warning"
            size="medium"
            variant="contained"
            aria-label="play/ pause"
            onClick={(e) => playOrPauseAudio(e)}
          >
            {isAudioPlaying ? (
              <PauseCircle fontSize="large" />
            ) : (
              <PlayCircle fontSize="large" />
            )}
          </IconButton>
          <div className="flag-div nav-button">
            <div className="flag-div">
              <div>
                <img
                  className="flag"
                  src={america}
                  alt="America Flag"
                  onClick={() => changeSiteLanguage("en")}
                />
              </div>
            </div>
          </div>
        </Box>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .flag {
    width: 3rem;
    height: 2rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
`;

export default MusicAndFlag;
```

Container to show the animes the user has in their collection

### Organisms

```
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "../Atoms/Loading";
import Anime from "../Molecules/Anime";
import styled from "styled-components";
import PageBtnContainer from "../Molecules/PageBtnContainer";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAnimesContainer = () => {
  const { t } = useTranslation();
  const {
    getAnimes,
    animes,
    isLoading,
    page,
    totalAnimes,
    search,
    searchStatus,
    searchType,
    searchStared,
    sort,
    numOfPages,
    currentPlaylist,
  } = useAppContext();
  useEffect(() => {
    getAnimes();
  }, [
    page,
    search,
    searchStatus,
    searchStared,
    searchType,
    sort,
    currentPlaylist,
  ]);
  if (isLoading) {
    return <Loading center />;
  }

  if (animes.length === 0) {
    return (
      <Wrapper>
        <h2>
          {t("my_animes_container.no_anime_message1")}
          <NavLink to="/add-anime" className="btn btn-block btn-hipster">
            {t("my_animes_container.no_anime_message2")}
          </NavLink>
        </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalAnimes} anime{animes.length > 1 && "s"} found in playlist
      </h5>
      <div className="animes">
        {animes.map((anime) => {
          return <Anime key={anime._id} {...anime} type="delete" />;
        })}
      </div>
      <div className="pageBtnContainer">
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .animes {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    color: var(--textColor);
  }

  .pageBtnContainer {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  @media (min-width: 992px) {
    .animes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
    }
  }
`;
export default MyAnimesContainer;
```

### Context

The app uses React's context API. The actions folder continues the action titles imported into the app context and then called in the reducer to update the global state.

Here is an example of the get animes function, which sends an API request to the backend to get the user's animes from the MongoDB database and handles any sorting or searching.

##### Actions

```
export const GET_ANIMES_BEGIN = "GET_ANIMES_BEGIN";
export const GET_ANIMES_SUCCESS = "GET_ANIMES_SUCCESS";
```

##### appContext

```
  const getAnimes = async () => {
    const { page, search, searchStatus, searchType, sort, currentPlaylist } =
      state;

    let url = `/animes?page=${page}&status=${searchStatus}&animeType=${searchType}&sort=${sort}&currentPlaylistID=${currentPlaylist.id}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_ANIMES_BEGIN });
    try {
      const { data } = await authFetch(URL);
      const { animes, totalAnimes, numOfPages } = data;
      dispatch({
        type: GET_ANIMES_SUCCESS,
        payload: {
          animes,
          totalAnimes,
          numOfPages,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ANIMES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
```

#### reducer

```
  if (action.type === GET_ANIMES_BEGIN) {
    return { ...state, isLoading: true};
  }
  if (action.type === GET_ANIMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      animes: action.payload.animes,
      totalAnimes: action.payload.totalAnimes,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === GET_ANIMES_ERROR) {
    action.payload.msg
      ? toast.error(action.payload.msg, {
          toastId: "getAnimes",
        })
      : toast.error("Something went wrong", {
          toastId: "getAnimes",
        });
    return {
      ...state,
      isLoading: false,
    };
  }
```

### pages

The app has a series of pages. Some are protected under a ProtectRoute component

```
const ProtectedRoute = ({ children }) => {
const { user } = useAppContext();
if (!user) {
  return <Navigate to="/landing" />;
}
return children;
};
export default ProtectedRoute;
```

I created a RegisterDemo component that auto-fills some dummy information for the email and password automatically. The process from that point on is the same as Register.js except for one key point. the user has a schema field called "isDemo". This is true when created as a demo user and will delete the user when the user logs out.

### translations

I used i18n throughout the entire app for translations. It looks like this.

```
    <h3>{t("add_anime.title")}</h3>
```

The English and Japanese translations are split up into JSON files and imported into the i18n file.

### App.js

```
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="my-animes" element={<MyAnimes />} />
          <Route index path="edit-playlist" element={<EditPlaylist />} />
          <Route index path="add-anime" element={<AddAnime />} />
          <Route index path="profile" element={<Profile />} />
          <Route index path="top-animes" element={<TopAnimes />} />
        </Route>
        <Route index path="/register" element={<Register />} />
        <Route index path="/register-demo" element={<RegisterDemo />} />
        <Route index path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## **Server**

The server is built concurrently in the same place as the client. In this case, I use Heroku.

### controllers

This file contains all the controllers to handle the API calls from the client side. Here is an example of the getAnimes get request we made earlier.

```
const getAnimes = async (req, res) => {
  const { sort, search, currentPlaylistID } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
    playlistID: currentPlaylistID,
  };
  // add stuff based on condition

  if (search) {
    //i: To match both lower case and upper case pattern in the string.
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Anime.find(queryObject);

  if (sort === "latest") {
    result = result.sort({ creationDate: -1 });
  } else if (sort === "oldest") {
    result = result.sort({ creationDate: 1 });
  } else if (sort === "rating") {
    // sort by popularity and then by rating
    result = result.sort({ rating: -1, popularity: -1 });
  } else if (sort === "episodeCount") {
    result = result.sort({ episodeCount: -1 });
  } else if (sort === "format") {
    result = result.sort({ format: -1 });
  } else if (sort === "a-z") {
    result = result.sort({ title: 1 });
  } else if (sort === "z-a") {
    result = result.sort({ title: -1 });
  } else if (sort === "date added") {
    result = result.sort({ createdAt: -1 });
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const animes = await result;

  const totalAnimes = await Anime.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAnimes / limit);

  res.status(StatusCodes.OK).json({ animes, totalAnimes, numOfPages });
};
```

### db

connects to the DB

### errors

Contains all of the custom HTTP error messages that will be sent back to the client to either be displayed in the alert field when logging in or registering or as a toast pop up on the rest of the app.

I learned most of the error handling from an udemy course I took a while back. I find the setup to work very well once set up. Sending error messages back to the client is something I struggled with before taking that course.

### middleware

contains the auth and error-handler middleware

### models

Contains the models for the mongo DB database.

#### Anime.js

```
import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    creationDate: {
      type: Date,
      required: false,
    },
    id: {
      type: Number,
      required: [true, "Please provide id"],
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    japanese_title: {
      type: String,
      required: [false, "Please provide Japanese title"],
    },
    rating: {
      type: Number,
      required: false,
    },
    format: {
      type: String,
      required: false,
    },
    episodeCount: {
      type: Number,
      required: false,
    },
    synopsis: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    youtubeVideoId: {
      type: String,
      required: false,
    },
    playlistID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Anime", AnimeSchema);

```

#### User.js

```
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const playlist = new mongoose.Schema(
  {
    title: String,
    id: String,
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  isDemo: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "dark",
  },

  language: {
    type: String,
    enum: ["en", "jp"],
    default: "en",
  },

  playlists: {
    type: [playlist],
    default: [
      {
        title: "Default",
        id: "0",
      },
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function () {
  // hash the password
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Generate JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
// compare the entered password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);

```

### routes

I import the different routes into the server file to keep everythign clean. Here is the animesRoutes.js

```
import express from "express";
const router = express.Router();

import {
createAnime,
deleteAnime,
getAnimes,
} from "../controllers/animesController.js";

// the apiLimiter middleware is used to limit the number of requests for registering and logging in
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
windows: 15 * 60 * 1000, // 15 minutes
max: 500,
message: "Too many requests from this IP, please try again after 15 minutes",
});

// the base URL
// app.use("/api/v1/animes", authenticateUser, animesRouter);

router.route("/").post(apiLimiter, createAnime).get(getAnimes);
// :id is a dynamic parameter
router.route("/:id").delete(deleteAnime);

export default router;

```

### utils

It contains the check permissions files which compare two user ids.

### server.js

Relatively simple and clean setup. There are some protections in place.

```
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "URL";
import path from "path";

// protections
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import animesRouter from "./routes/animesRoutes.js";
import playlistsRouter from "./routes/playlistsRoutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// Load environment variables from .env file
dotenv.config();

// start up the server
const app = express();

// get the app to use JSON as the default data format
app.use(express.json());

// protections
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//sanitize input
app.use(XSS());
// prevents MongoDB operator injection from MongoDB queries
app.use(mongoSanitize());

// app level routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/animes", authenticateUser, animesRouter);
app.use("/api/v1/playlists", authenticateUser, playlistsRouter);

// middleware
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.URL));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// start the server

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

```
