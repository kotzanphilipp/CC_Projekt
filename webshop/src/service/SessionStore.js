import { computed, reactive } from "vue";
//import firebase from "firebase";

const empty = "";

const state = reactive({
  token: empty, //session token
  role: "ADMIN", //role admin or customer
  email: empty, //email of active user
  uid: empty, //authorization header
});

function createSession(inputToken, inputEmail, uid) {
  state.token = inputToken;
  state.role = "TESTROLE";
  state.email = inputEmail;
  state.uid = uid;
}

function setEmail(inputEmail) {
  state.email = inputEmail;
}

function setToken(inputToken) {
  state.token = inputToken;
}

function setId(inputId) {
  state.uid = inputId;
}

function resetSession() {
  state.token = empty;
  state.role = empty;
  state.email = empty;
  state.uid = empty;
}

export default function useSession() {
  return {
    role: computed(() => state.role),
    email: computed(() => state.email),
    header: computed(() => state.header),
    uid: computed(() => state.uid),
    token: computed(() => state.token),
    createSession,
    resetSession,
    setId,
    setEmail,
    setToken
  };
}
