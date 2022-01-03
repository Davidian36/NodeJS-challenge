export default interface getSubscriptionRepository {
    getSubscription(
        user_email: string,
        user_firstName: string,
        user_gender: string,
        user_birthDate: string,
        consent_flag: number,
        newsletter_id: number,
    ): Promise<any>
}