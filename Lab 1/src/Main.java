import com.fastcgi.FCGIInterface;
import com.google.gson.Gson;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        Gson gson = new Gson();
        var fcgi = new FCGIInterface();
        while (fcgi.FCGIaccept() >= 0) {
            String request;
            try {
                request = readRequest();
            } catch (IOException e) {
                throw new RuntimeException();
            }

            FastCGIRequest fRequest = gson.fromJson(request, FastCGIRequest.class);
            FastCGIResponse fResponse = FastCGIResponse.createNewResponse(fRequest);
            String response = gson.toJson(fResponse, FastCGIResponse.class);
            var httpResponse = """
                    HTTP/1.1 200 OK
                    Content-Type: application/json
                    
                    %s
                    """.formatted(response);
            System.out.println(httpResponse);
        }
    }

    private static String readRequest() throws IOException {
        FCGIInterface.request.inStream.fill();
        var ctLength = FCGIInterface.request.inStream.available();
        var bf = ByteBuffer.allocate(ctLength);
        var readBytes = FCGIInterface.request.inStream.read(bf.array(), 0, ctLength);
        var rqBody = new byte[readBytes];
        bf.get(rqBody);
        bf.clear();
        return new String(rqBody, StandardCharsets.UTF_8);
    }
}