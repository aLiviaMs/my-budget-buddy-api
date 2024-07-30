import { TObject } from '../../../../shared/common/types';

export interface IMailService {
  /**
   * @description Send email
   */
  sendMail(content: TObject): Promise<void>;

  /**
   * @description Send email sandbox
   */
  sendMailSandBox(content: TObject): Promise<void>;
}
