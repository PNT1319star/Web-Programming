package weblab.webproject4.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class JwtDTO {
    @NonNull
    private String userName;
    @NonNull
    private String jwt;
}
