import { withApiPath } from "../_handler.js";

export default withApiPath((req) => `/api/assets/${req.query.id}`);
