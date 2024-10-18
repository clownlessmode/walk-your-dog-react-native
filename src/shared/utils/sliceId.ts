function sliceId(id: string) {
    const lastSixDigits = id.replace(/\D/g, '').slice(-6);

    if (lastSixDigits.length === 6) {
      return lastSixDigits.slice(0, 3) + ' ' + lastSixDigits.slice(3);
    }
  }
  export default sliceId

  