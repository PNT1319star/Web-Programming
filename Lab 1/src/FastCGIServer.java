import com.fastcgi.FCGIInterface;

import java.util.ArrayList;
import java.util.List;

public class FastCGIServer {
    private static final List<String> results = new ArrayList<>();

    public static void main(String[] args) {
        FCGIInterface fcgi = new FCGIInterface();
        while(fcgi.FCGIaccept() >= 0) {
            double xVal = fcgi.g
        }
    }
}