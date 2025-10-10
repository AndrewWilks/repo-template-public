export function messageForRepo() {
  const esc = {
    reset: "\u001b[0m",
    bold: "\u001b[1m",
    red: "\u001b[31m",
    yellow: "\u001b[33m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    green: "\u001b[32m",
  };

  const banner = [
    "",
    "//////////////////////////////////////////////////////////",
    "//                                                      //",
    "//    ██╗    ██╗██╗██╗     ██╗  ██╗███████╗██╗   ██╗    //",
    "//    ██║    ██║██║██║     ██║ ██╔╝██╔════╝╚██╗ ██╔╝    //",
    "//    ██║ █╗ ██║██║██║     █████╔╝ ███████╗ ╚████╔╝     //",
    "//    ██║███╗██║██║██║     ██╔═██╗ ╚════██║  ╚██╔╝      //",
    "//    ╚███╔███╔╝██║███████╗██║  ██╗███████║   ██║       //",
    "//     ╚══╝╚══╝ ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝       //",
    "//                                                      //",
    "//////////////////////////////////////////////////////////",
    "",
  ].join("\n");

  const coloredBanner = `${esc.yellow}${esc.bold}${banner}${esc.reset}`;

  const bodyLines = [];
  bodyLines.push(coloredBanner);
  bodyLines.push("");
  bodyLines.push(
    `${esc.magenta}${esc.bold}WILKSY${esc.reset} says: ${esc.cyan}Hello and thank you for checking out this repository!${esc.reset}`
  );
  bodyLines.push("");
  bodyLines.push(
    `${esc.green}Feel free to use it, adapt it, and open issues or reach out if you need help.${esc.reset}`
  );
  bodyLines.push("");
  bodyLines.push(`Contact: ${esc.bold}me@andrewwilks.au${esc.reset}`);
  bodyLines.push("Repo: https://github.com/AndrewWilks/repo-template-public");
  bodyLines.push("GitHub: https://github.com/AndrewWilks/");

  return bodyLines.join("\n");
}

export default messageForRepo;
