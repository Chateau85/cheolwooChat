import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirebaseConfig } from "./firebaseConfig";

const app = getApps().length ? getApp() : initializeApp(getFirebaseConfig());

const createAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    if (error.code === "auth/already-initialized") {
      return getAuth(app);
    }
    throw error;
  }
};

const auth = createAuth();
const storage = getStorage(app);
export const DB = getFirestore(app);

const requireCurrentUser = () => {
  if (!auth.currentUser) {
    throw new Error("인증된 사용자가 없습니다.");
  }
  return auth.currentUser;
};

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const uploadImage = async (uri) => {
  if (uri.startsWith("https://")) {
    return uri;
  }

  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error("프로필 이미지를 불러오지 못했습니다.");
  }

  const blob = await response.blob();
  const imageRef = ref(storage, `/profile/${requireCurrentUser().uid}/photo.jpg`);
  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: blob.type || "image/jpeg",
  });
  return getDownloadURL(snapshot.ref);
};

export const signup = async ({ name, email, password, photo }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photo);
  await updateProfile(user, { displayName: name, photoURL });
  return user;
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = requireCurrentUser();
  return { uid, name: displayName, email, photo: photoURL };
};

export const updateUserInfo = async (photo) => {
  const user = requireCurrentUser();
  const photoURL = await uploadImage(photo);
  await updateProfile(user, { photoURL });
  return photoURL;
};

export const signout = async () => {
  await signOut(auth);
};

export const createChannel = async ({ title, desc }) => {
  const channelRef = doc(collection(DB, "channels"));
  const channel = {
    id: channelRef.id,
    title,
    description: desc,
    createdAt: Date.now(),
  };
  await setDoc(channelRef, channel);
  return channelRef.id;
};

export const createMessage = ({ channelId, message }) =>
  setDoc(doc(DB, "channels", channelId, "messages", message._id), {
    ...message,
    createdAt: Date.now(),
  });
