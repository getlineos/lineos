import { withApiPath } from "../_handler.js";

export default withApiPath((req) => `/api/apps/${req.query.id}`);
