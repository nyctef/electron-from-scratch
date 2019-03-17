import childProcess from 'child_process';
import readline from 'readline';

const webserverDll = `${__dirname}/../server/server.dll`;

interface WebserverDetails {
  baseUri: string;
  authToken: string;
}

/**
 * Start the webserver process, parse its stdout, and return relevant details
 * for consuming the API
 */
const runWebserver = (): Promise<WebserverDetails> => {
  const childProc = childProcess.spawn('dotnet', [webserverDll], {
    env: { ASPNETCORE_ENVIRONMENT: 'Development' }
  });

  const rl = readline.createInterface({ input: childProc.stdout });

  let baseUri: string | null, authToken: string | null;

  const result = new Promise<WebserverDetails>((resolve, reject) => {
    rl.on('line', line => {
      console.log('webserver: ', line);

      // `string.match` gives us an array of match values or null.
      // If it gives us a result, then regexMatch[0] will be the entire match
      //   and regexMatch[1] will be the contents of the first capturing group.
      // This is a bit ugly; there might be a nicer way of doing this.
      let regexMatch: RegExpMatchArray | null = null;
      if ((regexMatch = line.match(/^AuthToken:\s*(.*)$/))) {
        authToken = regexMatch[1];
      }
      if ((regexMatch = line.match(/Now listening on: (https?:\/\/.*)$/))) {
        const url = new URL(regexMatch[1]);
        // if the server is listening on 0.0.0.0 we can't actually call it through that
        if (url.hostname === '0.0.0.0') {
          url.hostname = 'localhost';
        }
        baseUri = url.toString();
      }

      // once we've read all the relevant details from the child process stdout,
      // hand it to our consumers.
      if (authToken && baseUri) {
        resolve({ authToken, baseUri });
      }
    });
  });

  return result;
};

export { runWebserver };
