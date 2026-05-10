import { withApiPath } from "../_handler.js";

export default withApiPath((req) => `/api/profiles/${req.query.id}`);
