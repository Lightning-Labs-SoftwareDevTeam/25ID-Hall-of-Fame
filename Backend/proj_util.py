def now_hst(return_type="datetime"):
    """
    returns current HST as datetime or string
    """

    import datetime
    hst_adjustment = datetime.timedelta(hours=-10)
    time_datetime = datetime.datetime.now(datetime.timezone.utc) + hst_adjustment
    time_string = time_datetime.strftime("%B %d, %H:%M HST")

    match return_type:
        case "datetime": return time_datetime
        case "string": return time_string