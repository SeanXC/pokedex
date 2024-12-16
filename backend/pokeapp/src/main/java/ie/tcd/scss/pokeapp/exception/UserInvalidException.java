package ie.tcd.scss.pokeapp.exception;

/**
 * 自定义异常：当用户信息不合法时抛出此异常
 */
public class UserInvalidException extends RuntimeException {
    public UserInvalidException(String message) {
        super(message);
    }
}
