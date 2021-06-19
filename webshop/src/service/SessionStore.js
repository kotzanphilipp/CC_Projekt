import { computed, reactive } from "vue";

const empty = "";

const state = reactive({
  token: empty, //session token
  role: empty, //role admin or customer
  email: empty, //email of active user
  header: empty, //authorization header
});

function createSession(inputToken, inputRole, inputEmail) {
  state.token = inputToken;
  state.role = inputRole;
  state.email = inputEmail;
  state.header = "TESTHEADER";
}

export default function useSession() {
  return {
    role: computed(() => state.role),
    email: computed(() => state.email),
    header: computed(() => state.header),
    createSession
  };
}
