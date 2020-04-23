import * as shell from "shelljs";

shell.rm("-rf", "dist/server/email-templates");
shell.cp("-R", "src/server/email-templates", "dist/server/email-templates");